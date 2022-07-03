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

export interface IClassicResponse extends INegativeResponse { 
  status: statusType,
  totalResults?: number,
  articles?: IArticle[],
};

export interface ISource {
  id: stringOrNull,
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
