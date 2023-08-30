import axios from 'axios';
import exp from 'constants';

// development

// export const api_url = axios.create({
//     baseURL: 'http://127.0.0.1:5000'
//   })

// production

// export const api_url = axios.create({
//     baseURL: 'https://shownbooking-a10ea6e13f6b.herokuapp.com'
//   })
export const api_url= axios.create({baseURL:process.env.NEXT_PUBLIC_API })