import { useRouter } from "next/router";
import Button from '@mui/material/Button';
import Image from "next/image";
import itemStyle from "../../styles/item.module.css";

const ItemDetail = ({item}) => {
    const router = useRouter();
    // const { id = []} = router.query;
  
    const stylesButton = {
        marginRight: "20px",
        marginTop: "20px",
        color: "blue",
      };
    return <div style={{marginLeft: '30px'}} className="item">
    <Image loader={() => item.picUrl} src={item.picUrl} alt={item.name} width={500} height={400} />

    <div className={itemStyle.itemdetails}>
      <div>
        <p className={itemStyle.itemname}>{item.name}</p>
        <p className={itemStyle.itemprice}>₹{item.price}/day</p>
        <Button style={stylesButton} onClick={() => {router.push('/laptops')}} variant="outlined">
            Go back
          </Button>
      </div>
    </div>
  </div>


}




export const getStaticProps = async (context) => {

    const res = await fetch(`https://equipment-renting.herokuapp.com/laptops/item/${context.params.id[1]}`)

    const item = await res.json();

    return {
        props: {
            item,
        }
    }

}

export const getStaticPaths = async () => {

    const res = await fetch(`https://equipment-renting.herokuapp.com/laptops`);
    const funzone = await res.json();

    const items = funzone.map(({_id,name}) => [`hire-${name.replace(/\s/g,'-')}-at-kalyanagar`,_id])


    const paths = items.map((id) => ({params: {"id": [id[0].toString(),id[1].toString()]}}));
  
    return {
        paths,
        fallback: false,
    }


}

export default ItemDetail;