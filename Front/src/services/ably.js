
import { Realtime } from 'ably/browser/static/ably-commonjs.js';

window.Ably = new Realtime(process.env.ABLY_KEY);