import Button from '@mui/material/Button';
import { LuSearch } from "react-icons/lu";
const SearchBar = () => {
   return(
        <div className='headerSearch ml-3 mr-3'>
            <input type='text' placeholder='Search for products...'/>
            <Button><LuSearch/></Button>
        </div>
   )
}
export default SearchBar;