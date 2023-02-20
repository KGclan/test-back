import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EssencesService {
  constructor(private readonly httpService: HttpService) {}

  async getAuthData(): Promise<{ access_token: string; base_domain: string }> {
    return this.httpService.axiosRef
      .get('https://test.gnzs.ru/oauth/get-token.php', {
        headers: {
          'X-Client-Id': 30878566,
          'Content-Type': 'application/json;charset=utf-8',
        },
      })
      .then((responce) => responce.data);
  }

  async getEssencesData(url: string, timestamp: string) {
    const authData = await this.getAuthData();

    return this.httpService.axiosRef
      .get(`https://${authData.base_domain}${url}`, {
        headers: {
          Authorization: `Bearer ${authData.access_token}`,
        },
        params: {
          'filter[created_at][from]': timestamp,
        },
      })
      .then((responce) => responce.data._embedded);
  }

  async getEssenceData(url: string) {
    const authData = await this.getAuthData();

    return this.httpService.axiosRef
      .get(`https://${authData.base_domain}${url}`, {
        headers: {
          Authorization: `Bearer ${authData.access_token}`,
        },
      })
      .then((responce) => responce.data);
  }

  async postEssenceData(url: string) {
    const authData = await this.getAuthData();

    return this.httpService.axiosRef
      .post(
        `https://${authData.base_domain}${url}`,
        [{ name: `Моя сущность` }],
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authData.access_token}`,
          },
        },
      )
      .then((responce) => responce.data._embedded);
  }
}
