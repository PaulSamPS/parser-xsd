// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import * as xml2js from 'xml2js';
//
// @Injectable()
// export class XsdBodyParserMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     if (
//       req.is('text/xml') ||
//       req.is('application/xml') ||
//       req.is('application/xsd')
//     ) {
//       let data = '';
//       req.setEncoding('utf8');
//
//       req.on('data', (chunk) => {
//         data += chunk;
//       });
//
//       req.on('end', () => {
//         const parser = new xml2js.Parser({
//           explicitArray: false, // не создавать массивы для одиночных элементов
//           trim: true, // удаление пробелов
//           explicitRoot: false, // убрать корневой элемент
//         });
//
//         parser.parseString(data, (err, result) => {
//           if (err) {
//             return next(err);
//           }
//
//           // Рекурсивная функция для преобразования всего в строки
//           const deepConvertToString = (obj: any): any => {
//             if (typeof obj === 'object' && obj !== null) {
//               return JSON.stringify(obj); // конвертируем объект/массив в строку
//             }
//             return String(obj); // если это примитив, конвертируем в строку
//           };
//
//           req.body = deepConvertToString(result); // Преобразуем все объекты и массивы в строки
//           next();
//         });
//       });
//     } else {
//       next();
//     }
//   }
// }

import { Injectable, NestMiddleware } from '@nestjs/common';
import * as bodyParser from 'body-parser';

const bodyParserXML = bodyParser.text({
  type: 'application/xml',
});

@Injectable()
export class XMLMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    bodyParserXML(req, res, next);
  }
}
