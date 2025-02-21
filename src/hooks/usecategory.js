import { useQuery } from "@tanstack/react-query";
import { getcategory, getcategoryReport, getEditBudgetData } from "@/lib/utils";

export function useCategory() {
    const {
        isLoading,
        data: category,
        error,
    } = useQuery({
        queryKey: ["category"],
        queryFn: getcategory,
    });

    return { isLoading, error, category };
};

export function useCategoryById(id) {
    const {
        isLoading,
        data: category,
        error,
    } = useQuery({
        queryKey: [id, "category"],
        queryFn: () => getEditBudgetData (id),
    });

    return { isLoading, error, category };
};

export function useCategoryReport() {
    const {
        isLoading,
        data: category,
        error,
    } = useQuery({
        queryKey: ["category-report"],
        queryFn: getcategoryReport,
    });

    return { isLoading, error, category };
}
