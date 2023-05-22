export const fetcher = (...args: any[]): Promise<any> =>
  fetch(...args).then((res: Response) => res.json());