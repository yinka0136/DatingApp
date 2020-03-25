import { Photo } from './photo';

export interface User {
id: number;
username: string;
password: string;
filePath: string;
dateOfBirth: Date;
photos: Photo[];
createdAt: Date;
updatedAt: Date;
city: string;
country: string;
introduction: string;
lookingFor: string;
interests: string;
knownAs: string;
gender: string;



}
