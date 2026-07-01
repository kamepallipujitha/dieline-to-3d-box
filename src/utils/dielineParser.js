import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export async function parseDielineFile(file) {
  let canvas;

  if (file.type === "application/pdf") {
    canvas = await renderPdfToCanvas(file);
  } else {
    canvas = await renderImageToCanvas(file);
  }

  const ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const bbox = detectContentBox(data, canvas.width, canvas.height);

  const verticalLines = detectVerticalFoldLines(data, canvas.width, canvas.height, bbox);
  const horizontalLines = detectHorizontalFoldLines(data, canvas.width, canvas.height, bbox);

  const dimensions = calculateBoxDimensions({
    bbox,
    verticalLines,
    horizontalLines,
  });

  return {
    imageUrl: canvas.toDataURL("image/png"),
    imageWidth: canvas.width,
    imageHeight: canvas.height,
    bbox,
    verticalLines,
    horizontalLines,
    box: dimensions,
  };
}

async function renderImageToCanvas(file) {
  const url = URL.createObjectURL(file);
  const img = new Image();

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
  });

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  return canvas;
}

async function renderPdfToCanvas(file) {
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  const page = await pdf.getPage(1);

  const viewport = page.getViewport({ scale: 2 });
  const canvas = document.createElement("canvas");

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  const ctx = canvas.getContext("2d");

  await page.render({
    canvasContext: ctx,
    viewport,
  }).promise;

  return canvas;
}

function detectContentBox(data, width, height) {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const isNotWhite = r < 245 || g < 245 || b < 245;

      if (isNotWhite) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

function isFoldPixel(r, g, b) {
  const redLine = r > 150 && g < 170 && b < 170 && r > g + 25;
  const greenLine = g > 130 && r < 180 && b < 180 && g > r + 15;

  return redLine || greenLine;
}

function detectVerticalFoldLines(data, width, height, bbox) {
  const xs = [];

  for (let x = bbox.minX; x <= bbox.maxX; x++) {
    let count = 0;

    for (let y = bbox.minY; y <= bbox.maxY; y++) {
      const i = (y * width + x) * 4;

      if (isFoldPixel(data[i], data[i + 1], data[i + 2])) {
        count++;
      }
    }

    if (count > bbox.height * 0.05) {
      xs.push(x);
    }
  }

  return cluster(xs);
}

function detectHorizontalFoldLines(data, width, height, bbox) {
  const ys = [];

  for (let y = bbox.minY; y <= bbox.maxY; y++) {
    let count = 0;

    for (let x = bbox.minX; x <= bbox.maxX; x++) {
      const i = (y * width + x) * 4;

      if (isFoldPixel(data[i], data[i + 1], data[i + 2])) {
        count++;
      }
    }

    if (count > bbox.width * 0.05) {
      ys.push(y);
    }
  }

  return cluster(ys);
}

function cluster(values) {
  if (values.length === 0) return [];

  const groups = [];
  let current = [values[0]];

  for (let i = 1; i < values.length; i++) {
    if (values[i] - values[i - 1] <= 8) {
      current.push(values[i]);
    } else {
      groups.push(average(current));
      current = [values[i]];
    }
  }

  groups.push(average(current));

  return groups;
}

function average(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function calculateBoxDimensions({ bbox, verticalLines, horizontalLines }) {
  let widthPx = bbox.width * 0.25;
  let depthPx = bbox.width * 0.12;
  let heightPx = bbox.height * 0.55;

  if (verticalLines.length >= 4) {
    const gaps = [];

    for (let i = 1; i < verticalLines.length; i++) {
      const gap = verticalLines[i] - verticalLines[i - 1];

      if (gap > 20) {
        gaps.push(gap);
      }
    }

    if (gaps.length > 0) {
      gaps.sort((a, b) => b - a);

      widthPx = gaps[0];
      depthPx = gaps[gaps.length - 1];
    }
  }

  if (horizontalLines.length >= 2) {
    const gaps = [];

    for (let i = 1; i < horizontalLines.length; i++) {
      const gap = horizontalLines[i] - horizontalLines[i - 1];

      if (gap > 20) {
        gaps.push(gap);
      }
    }

    if (gaps.length > 0) {
      heightPx = Math.max(...gaps);
    }
  }

  const width3D = 2;
  const depth3D = clamp((depthPx / widthPx) * 2, 0.6, 2.5);
  const height3D = clamp((heightPx / widthPx) * 2, 1.2, 4);

  return {
    width: width3D,
    height: height3D,
    depth: depth3D,
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}