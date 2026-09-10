import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const PUBLIC_DIR = join(import.meta.dir, "..", "public");

const ASSETS = [
  {
    url: "https://havilandhouse.com/favicon.ico",
    dest: "favicon.ico",
  },
  {
    url: "https://havi-web.s3.ap-southeast-1.amazonaws.com/2026_08_25/logo-haviland-house-1787647576958.png",
    dest: "logo-haviland-house.png",
  },
  {
    url: "https://havi-web.s3.ap-southeast-1.amazonaws.com/2026_08_22/sujet-marina-da-nang-hotel-by-haviland-1787366966330.jpg",
    dest: "sujet-marina-cover.jpg",
  },
  {
    url: "https://havi-web.s3.ap-southeast-1.amazonaws.com/2026_07_18/sujet-5-toa-nha-2-11zon-1784341667946.webp",
    dest: "sujet-marina-building.webp",
  },
];

async function download() {
  if (!existsSync(PUBLIC_DIR)) {
    mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  for (const asset of ASSETS) {
    try {
      console.log(`Downloading ${asset.url} -> ${asset.dest}...`);
      const res = await fetch(asset.url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });
      if (!res.ok) {
        console.error(`Failed to download ${asset.url}: ${res.status} ${res.statusText}`);
        continue;
      }
      const buffer = await res.arrayBuffer();
      await Bun.write(join(PUBLIC_DIR, asset.dest), buffer);
      console.log(`Saved ${asset.dest} (${buffer.byteLength} bytes)`);
    } catch (err) {
      console.error(`Error downloading ${asset.url}:`, err);
    }
  }
}

download();
