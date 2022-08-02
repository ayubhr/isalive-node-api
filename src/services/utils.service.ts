import { HttpException } from '@exceptions/HttpException';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import * as Promise from 'bluebird';
import { decorateResponse, isEmpty } from '@utils/util';

const config: AxiosRequestConfig = {
  baseURL: 'https://transparencyreport.google.com',
  headers: { 'cache-control': 'no-cache' },
};

class UtilsService {
  private client: AxiosInstance = axios.create(config);

  public async checkSingleHost(url): Promise<any> {
    const response: any = await this.client.get(`/transparencyreport/api/v3/safebrowsing/status?site=${url}`);
    return response.data;
  }

  public async analyseHost(url): Promise<any> {
    let host_status_resp = await this.checkSingleHost(url);

    let hostStatus = decorateResponse(host_status_resp);

    return hostStatus === 'clean' ? true : false;
  }

  public async checkHostLinks(urls): Promise<any> {
    let done = false;

    let cleanLink = null;
    await Promise.each(urls, async (url, i) => {
      if (!done) {
        let hostStatus = await this.analyseHost(url);
        if (hostStatus) {
          done = true;
          cleanLink = url;
        }
      }
    }).catch(error => {
      console.log(error);
      done = true;
    });

    return cleanLink;
  }
}

export default UtilsService;
