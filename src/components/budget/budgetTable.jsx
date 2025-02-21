import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"
import { useTransaction } from '@/hooks/usetransaction'
import { Card, CardContent, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Link } from 'react-router';
import { deleteBudgetData } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { ToastAction } from '@radix-ui/react-toast';
import { toast } from '@/hooks/use-toast';
import Loading from '../Loading';
import { Pencil, Trash2 } from 'lucide-react';
import { useCategory } from '@/hooks/usecategory';
import { Badge } from '../ui/badge';
import moment from 'moment';

const budgetTable = () => {
    const { isLoading:isCatLoading, error:isCatEror, category } = useCategory();
    const { mutate, isPending, isError, error: creteError } = useMutation({
        mutationFn:deleteBudgetData,
        onSuccess: () => {
            toast({
                variant: "success",
                description: "delete Sucessfully.",
            })
        },
        onError: () => {
            toast({
                variant: "destructive",
                title: error,
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    });
    if (isCatLoading) {
        return <Loading />
    }
    if (isCatEror) {
        return <h1>Something is wrong</h1>
    };
    function handleDelete(id) {
        if (confirm("Are you sure you want to delete this Budget?") !== true) {
            return;
        };
        mutate({id})
    }
    return (
        <div className='container'>
            <div className='flex justify-end mb-5'>
            <Link to={'new'}><Button className="mt-4"> + Create Budget</Button></Link>
            </div>
            <Card>
                <CardContent>
                    <Table>
                        <TableCaption>A list of your Budget.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {category.length ? category.map((t) =>{
                                return <TableRow key={t._id}>
                                    <TableCell className="font-medium">{t.name}</TableCell>
                                    <TableCell className="font-bold">₹{(t.amount).toFixed(2)}</TableCell>
                                    <TableCell>{moment(t.createdAt).format("DD/MM/YYYY")}</TableCell>
                                    <TableCell>
                                        <div className='flex gap-2 flex-nowrap items-center justify-end'>
                                            <Link to={`edit/${t._id}`}> <Button variant="outline" size="icon"><Pencil /></Button></Link>
                                            <Button variant="outline" size="icon" onClick={() => handleDelete(t._id)}><Trash2 color='red' /></Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            }) : <TableRow className="text-center text-muted-foreground"><TableCell colspan="6">No data avalable</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default budgetTable