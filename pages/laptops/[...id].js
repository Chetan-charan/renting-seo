import { useRouter } from "next/router";
import Button from '@mui/material/Button';
import Image from "next/image";
import itemStyle from "../../styles/item.module.css";
import useSWR from "swr";
import { useContext } from "react";
import { BotContext } from "../_app";
import Head from "next/head";

const ItemDetail = ({item}) => {
    const router = useRouter();
    
    const isBotValue = useContext(BotContext);

    const fetcher = async (url) => {
        const data = await fetch(url);
        const data1 = await data.json();
        return data1;
    }
    const {data: itm} = useSWR(
      `https://equipment-renting.herokuapp.com/laptops/item/${item._id}`,
       fetcher,
       { initialData: item, revalidateOnMount: !isBotValue })
  
    const stylesButton = {
        marginRight: "20px",
        marginTop: "20px",
        color: "blue",
      };

      return (
        <>
          <Head>
            <title>Hire {item.name} at Kalyanagar</title>
            <meta name="description" content="Hire Anything at Kalyan nagar" />
          </Head>
          {itm ? (
            <div style={{ marginLeft: "30px" }} className="item">
              <Image
                loader={() => itm.picUrl}
                src={itm.picUrl}
                alt={itm.name}
                width={500}
                height={400}
              />
    
              <div className={itemStyle.itemdetails}>
                <div>
                  <p className={itemStyle.itemname}>{itm.name}</p>
                  <p className={itemStyle.itemprice}>₹{itm.price}/day</p>
                  <Button
                    style={stylesButton}
                    onClick={() => {
                      router.push("/laptops");
                    }}
                    variant="outlined"
                  >
                    Go back
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p style={{ marginLeft: "30px" }}>Loading..</p>
          )}
        </>
      );



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