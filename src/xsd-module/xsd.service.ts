import { Injectable } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { Response } from 'express';

@Injectable()
export class XsdService {
  async getCombinedXsd(res: Response) {
    const basePath = process.cwd();
    const xsdFiles = [
      path.join(basePath, 'src/xsd-parts/DocApplication/DocApplication.xsd'),
      path.join(basePath, 'src/xsd-parts/DocApplication/FieldsType.xsd'),
    ];

    // Получаем список файлов в папке Types
    const typesFolder = path.join(basePath, 'src/xsd-parts/Types');
    const typeFiles = await fs.promises.readdir(typesFolder);

    typeFiles.forEach((file) => {
      if (file.endsWith('Type.xsd')) {
        xsdFiles.push(path.join(typesFolder, file));
      }
    });

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
