import toast, {Toaster} from "react-hot-toast";
import {CountProducts} from "./components/CountProducts";
import {UniqueName} from "./components/UniqueName";
import {FindByProductId} from "./components/FindByProductId";
import {FindBySubstringName} from "./components/FindBySubstringName";
import {FindByOwnerId} from "./components/FindByOwnerId";
import {AddForm} from "./components/AddForm";
import {UpdateForm} from "./components/UpdateForm";
import {DeleteForm} from "./components/DeleteForm";
import {LowerCostForm} from "./components/LowerCostForm";
import {useEffect, useState} from "react";
import {ReloadButton} from "./components/ReloadButton";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {filtersState, isDataNeedsToBeUpdatedState, pagingState, productsState, sortState} from "./state/atoms";
import get from 'lodash.get'
import {getProducts} from "./utils/apiInteraction";
import {ProductsTable} from "./components/ProductsTable";
import {FiltersForm} from "./components/filter/FiltersForm";
import {SortForm} from "./components/SortForm";

function App() {

    const setRoutes = useSetRecoilState(productsState)
    const [isDataNeedsToBeUpdated, setIsDataNeedsToBeUpdated] = useRecoilState(isDataNeedsToBeUpdatedState)
    const filters = useRecoilValue(filtersState)
    const paging = useRecoilValue(pagingState)
    const sorting = useRecoilValue(sortState)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isDataNeedsToBeUpdated) {
            setIsLoading(true)
            setIsDataNeedsToBeUpdated(false)
            getProducts(filters, sorting, paging).then((response) => {
                setRoutes(response.data)
            }).catch((err) => {
                toast.error(get(err, 'response.data.message', 'Error loading data'))
            }).finally(() => setIsLoading(false))
        }
    })

    return (
        <div className="container pt-4">
            <Toaster position="bottom-right" reverseOrder={false}/>
            <CountProducts/>
            <UniqueName/>
            <br/>
            <br/>
            <FindByProductId/>
            <FindBySubstringName/>
            <FindByOwnerId/>
            <AddForm/>
            <UpdateForm/>
            <DeleteForm/>
            <LowerCostForm/>
            <FiltersForm/>
            <SortForm/>
            <ReloadButton isLoading={isLoading}/>
            <ProductsTable/>
        </div>
    )
}

export default App;
