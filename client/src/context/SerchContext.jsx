import {createContext,useContext,useState} from 'react'
const SearchContext = createContext();



const SearchProvide = ({children})=>{
    const [serach,setSearch] = useState({
        Keyword:'',
        result:[],
    });

     return(
        <SearchContext.Provider value={[serach,setSearch]}>
        {children}

        </SearchContext.Provider>
    )
}

const useSearch = ()=>useContext(SearchContext)

export {useSearch,SearchProvide};