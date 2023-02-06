import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";

// types
import { DbBookInfo } from "../types";

// hook gets book from db for current user with specific bookid
//  error if book not in db for the user will be caught in react query where hook is called

export default function useBookInDb(
  bookId: string | undefined,
  userId: number | undefined,
  initialBookData: DbBookInfo | undefined
): UseQueryResult<any, unknown> {
  const getBookByUserId = async () => {
    return axios
      .get(`https://${process.env.REACT_APP_API_URL}/api/books/${bookId}/users/${userId}`)
      .then((res) => {
        return res.data;
      });
  };

  return useQuery(["book", userId], getBookByUserId, {
    enabled: !!userId,
    initialData: initialBookData ?initialBookData :undefined
  });
}
