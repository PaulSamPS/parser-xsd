import { Injectable } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { Response } from 'express';

@Injectable()
export class XsdService {
  async getCombinedXsd(res: Response) {
    const basePath = process.cwd();
    const xsdFiles = [
      path.join(basePath, 'src/xsd-parts/WaySend/WaySend.xsd'),
      path.join(basePath, 'src/xsd-parts/WaySend/WaySendType.xsd'),
      path.join(basePath, 'src/xsd-parts/Types/docRefTransferMethodType.xsd'),
    ];

    let combinedXsdBody = '';

    for (const file of xsdFiles) {
      const xsdContent = await fs.promises.readFile(file, 'utf-8');
      // Удаляем заголовок, корневой элемент, xs:include и атрибуты vc
      const filteredContent = xsdContent
        .split('\n')
        .filter(
          (line) =>
            !line.trim().startsWith('<?xml') &&
            !line.trim().startsWith('<xs:schema') &&
            !line.trim().startsWith('</xs:schema>') &&
            !line.trim().startsWith('<xs:include') &&
            !line.includes('vc:minVersion') &&
            !line.includes('xmlns:vc'),
        )
        .join('\n');

      combinedXsdBody += filteredContent + '\n';
    }

    const combinedXsd = `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified" vc:minVersion="1.1" xmlns:vc="http://www.w3.org/2007/XMLSchema-versioning">
${combinedXsdBody}</xs:schema>`;

    res.header('Content-Type', 'application/xml');
    return res.send(combinedXsd);
  }
}
