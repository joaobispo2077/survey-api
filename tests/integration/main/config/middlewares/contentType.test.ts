import supertest from 'supertest';

import { app } from '../../../../../src/main/config/app';

describe('Content type Middleware', () => {
  it('should return default content type as json', async () => {
    app.get('/test_content_type_json', (_, res) => res.send());

    await supertest(app)
      .get('/test_content_type_json')
      .expect('content-type', /json/);
  });

  it('should be able to return content type as xml', async () => {
    app.get('/test_content_type_xml', (_, res) => {
      res.type('xml');
      res.send();
    });

    await supertest(app)
      .get('/test_content_type_xml')
      .set('content-type', 'application/xml')
      .expect('content-type', /xml/);
  });
});
