/* eslint-disable consistent-return */
import { RequestHandler } from 'express';
import { url } from 'inspector';
import { decodeUrl, encodeUrl, staticUrl } from '../controllers/urlShortener';
import logger from '../utils/logger';

export const encodeUrlRoute: RequestHandler = async (req, res) => {
  try {
    const response = await encodeUrl(req.body.url);
    return res.status(200).json(response);
  } catch (error: any) {
    logger.error(error);
    const responseCode = error.success ? 400 : 500;
    return res.status(responseCode).json({ success: false, error: error.message || 'Could not fetch Data' });
  }
};

export const decodeUrlRoute: RequestHandler = async (req, res) => {
  try {
    const response = await decodeUrl(req.body.url);
    return res.status(200).json(response);
  } catch (error: any) {
    logger.error(error);
    const responseCode = error.success ? 400 : 500;
    return res.status(responseCode).json({ success: false, error: error.message || 'Could not fetch Data' });
  }
};

export const staticUrlRoute: RequestHandler = async (req, res) => {
  try {
    const response = await decodeUrl(`${req.headers.host}${req.originalUrl}`);
    res.redirect(301, response.data);
  } catch (error: any) {
    logger.error(error);
    const responseCode = error.success ? 400 : 500;
    return res.status(responseCode).json({ success: false, error: error.message || 'Could not fetch Data' });
  }
};
