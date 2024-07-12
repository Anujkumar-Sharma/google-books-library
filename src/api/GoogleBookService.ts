import ApiService from "./ApiService";

const fetchBooks = (title: string) => {
  return ApiService.fetchData({ params: { q: title } });
};

export default fetchBooks;
