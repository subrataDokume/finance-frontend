import { useQuery } from "@tanstack/react-query";
import { deleteTransactionData, getEditTransactionData, getTransaction } from "@/lib/utils";

export function useTransaction() {
  const {
    isLoading,
    data: transaction,
    error,
  } = useQuery({
    queryKey: ["transaction"],
    queryFn: getTransaction,
  });

  return { isLoading, error, transaction };
}

export function getEditTransaction(id){
  const {
    isLoading: edtisLoading,
    data: edttransaction,
    error: edterror,
  } = useQuery({
    queryKey: [id,"transaction"],
    queryFn: () => getEditTransactionData(id),
  });

  return { edtisLoading, edterror, edttransaction };
};

// export function deleteTransaction(id){
//   const {
//     isLoading: isDeleting,
//     data,
//     error: deletingEror,
//   } = useQuery({
//     queryKey: [id,"delete-transaction"],
//     queryFn: () => deleteTransactionData(id),
//   });

//   return { isDeleting, deletingEror, data };
// }