import { Injectable } from '@nestjs/common';
import { readdirSync } from 'fs';
import { join } from 'path';
// import { PrismaClient } from '@prisma/client';

@Injectable()
export class AvatarService {
  // private prisma = new PrismaClient();

  // async getAvatarListFromPublic() {
  //   const folderPath = join(process.cwd(), 'public');
  //   const files = readdirSync(folderPath).filter((file) =>
  //     file.endsWith('.png'),
  //   );

  //   const namesArray = ['Lio','Ella','Zara','Mia','Finn','Jimmy']

  //   return files.map((file, index) => ({
  //     id: index + 1,
  //     name: namesArray[index], 
  //     url: `/public/${file}`, 
  //   }));
  // }

  async getAvatarListFromPublic() {
    const folderPath = join(process.cwd(), 'public');
    const files = readdirSync(folderPath).filter((file) => file.endsWith('.png'));

    const namesArray = ['Lio', 'Ella', 'Zara', 'Mia', 'Finn', 'Jimmy'];

    const avatars = namesArray.map((name, index) => {
      const baseName = `avatar${index + 1}`;
      return {
        id: index + 1,
        name,
        url: files.includes(`${baseName}_4x.png`) ? `/public/${baseName}_4x.png` : null,
        url3x: files.includes(`${baseName}_3x.png`) ? `/public/${baseName}_3x.png` : null,
        url2x: files.includes(`${baseName}_2x.png`) ? `/public/${baseName}_2x.png` : null,
      };
    });

    return avatars;
  }
  async getAvatarList() {
    return [
      {
        id: 1,
        name: 'Lio',
        url: 'https://firebasestorage.googleapis.com/v0/b/pakshipper-b2b46.appspot.com/o/images%2Favatar1.png?alt=media&token=df7dde3a-f316-4cad-8028-f2073464e8b5',
      },
      {
        id: 2,
        name: 'Ella',
        url: 'https://firebasestorage.googleapis.com/v0/b/pakshipper-b2b46.appspot.com/o/images%2Favatar2.png?alt=media&token=19fa3538-af8c-4185-84d6-9b5351854746',
      },
      {
        id: 3,
        name: 'Zara',
        url: 'https://firebasestorage.googleapis.com/v0/b/pakshipper-b2b46.appspot.com/o/images%2Favatar3.png?alt=media&token=155d9aba-0f83-4c93-94af-5f0c1d1bf2b7',
      },
      {
        id: 4,
        name: 'Mia',
        url: 'https://firebasestorage.googleapis.com/v0/b/pakshipper-b2b46.appspot.com/o/images%2Favatar4.png?alt=media&token=79dee2b8-d7f2-414e-864e-da7c787d902b',
      },
      {
        id: 5,
        name: 'Finn',
        url: 'https://firebasestorage.googleapis.com/v0/b/pakshipper-b2b46.appspot.com/o/images%2Favatar5.png?alt=media&token=a7411724-5862-4704-b365-eb173e247ee7',
      },
      {
        id: 6,
        name: 'Jimmy',
        url: 'https://firebasestorage.googleapis.com/v0/b/pakshipper-b2b46.appspot.com/o/images%2Favatar6.png?alt=media&token=9dbc2dab-c8b0-45f7-af17-793256a94912',
      },
    ];
  }
}
