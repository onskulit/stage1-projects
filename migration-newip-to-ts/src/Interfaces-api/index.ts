type statusType = 'ok' | 'error';
export type stringOrNull = string | null;
export type HTMLElementOrNull = HTMLElement | null;

interface INegativeResponse {
  code?: string,
  message?: string,
}

export interface IArticle {
  source: {
    id: stringOrNull,
    name: stringOrNull,
  },
  author: stringOrNull,
  title: stringOrNull,
  description: stringOrNull,
  url: string,
  urlToImage: stringOrNull,
  publishedAt: string,
  content: stringOrNull
}

export interface IResponse extends INegativeResponse {
  status: statusType,
  totalResults?: number,
  articles?: IArticle[],
  sources?: ISource[],
}

export interface INewsResponse extends INegativeResponse { 
  status: statusType,
  totalResults?: number,
  articles?: IArticle[],
};

export interface ISource {
  id: string,
  name: stringOrNull,
  description: stringOrNull,
  url: stringOrNull,
  category: stringOrNull,
  country: stringOrNull
}

export interface ISourcesResponse extends INegativeResponse { 
  status: statusType,
  sources?: ISource[],
};

export interface IOptions {
  apiKey?: string;
  q?: string;
  searchIn?: string;
  sources?: string;
  domains?: string;
  excludeDomains?: string;
  from?: string;
  to?: string;
  language?: string;
  sortBy?: string;
  pageSize?: string;
  page?: string;
}

/* const Response: IResponse = {
    status: 'error',
    sources: [
        {id: '2',
        name: 'string',
        description: 'string',
        url: 'string',
        category: 'string',
        country: 'string'
        },
    ],
} */
