import { Injectable, Res } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { Response } from 'express';

@Injectable()
export class XsdService {
  async getCombinedXsd(@Res() res: Response) {
    const xsdFiles = [
      path.join(__dirname, 'schema1.xsd'),
      path.join(__dirname, 'WaySendType.xsd'),
      path.join(__dirname, 'DocRefTransferMethodType.xsd'),
    ];

    let combinedXsd =
      '<?xml version="1.0" encoding="UTF-8"?>\n<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified" vc:minVersion="1.1" xmlns:vc="http://www.w3.org/2007/XMLSchema-versioning">\n';

    for (const file of xsdFiles) {
      const xsdContent = await fs.promises.readFile(file, 'utf-8');
      combinedXsd += xsdContent
        .replace(/<xs:schema.*?>/, '')
        .replace(/<\/xs:schema>/, '');
    }

    combinedXsd += '\n</xs:schema>';
    res.header('Content-Type', 'application/xml');
    return res.send(combinedXsd);
  }
}
