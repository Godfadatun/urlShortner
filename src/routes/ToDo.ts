import { RequestHandler } from 'express';
import { completeTodo, createTodo, decodeUrl, encodeUrl, getTodo, staticUrl } from '../controllers/urlShortener';
import logger from '../utils/logger';

export const encodeUrlRoute: RequestHandler = async (req, res) => {
  try {
    const response = await encodeUrl(req.body.url);
    const responseCode = response.success === true ? 200 : 400;
    return res.status(responseCode).json(response);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ success: false, error: 'Could not fetch Data' });
  }
};

export const decodeUrlRoute: RequestHandler = async (req, res) => {
  try {
    const response = await decodeUrl(req.body.url);
    const responseCode = response.success === true ? 200 : 400;
    return res.status(responseCode).json(response);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ success: false, error: 'Could not fetch Data' });
  }
};

export const staticUrlRoute: RequestHandler = async (req, res) => {
  try {
    const response = await staticUrl(req.body.url);
    const responseCode = response.success === true ? 200 : 400;
    return res.status(responseCode).json(response);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ success: false, error: 'Could not fetch Data' });
  }
};
