import Item from "../components/Item";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateOrderAmount } from "../actions";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import itemStyles from "../styles/items.module.css";
import { useRouter } from "next/router";
import useSWRInfinite from "swr/infinite";
import { useContext } from "react";
import { BotContext } from "./_app";

export default function Furniture({ data }) {
  const isBotValue = useContext(BotContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const count = useSelector((state) => state.orderCountReducer);
  const items = useSelector((state) => state.itemUpdateReducer);

  const fetcher = async (url) => {
    const res = await fetch(url);
    const data1 = await res.json();
    return data1;
  };

  const getKey = (pageIndex, previousPageData) => {
    return `https://equipment-renting.herokuapp.com/furniture/${pageIndex}`;
  };

  const {
    data: furniture,
    size,
    setSize,
  } = useSWRInfinite(getKey, fetcher, {
    initialData: data,
    revalidateOnMount: !isBotValue,
  });
  const [arr, setArr] = useState(null);

  useEffect(() => {
    if (furniture && furniture.length) {
      setArr(furniture.flat());
    }
  }, [furniture]);

  return (
    <>
      <Button
        onClick={() => {
          dispatch(
            updateOrderAmount(
              items
                .map(({ price }) => price)
                .reduce((price, sum) => price + sum, 0)
            )
          );
          router.push("/checkout");
        }}
        style={{
          marginLeft: "88%",
          marginBottom: "10px",
          marginTop: "15px",
          color: "green",
        }}
        variant="text"
      >
        checkout
        <Badge badgeContent={count} color="secondary">
          <ShoppingCartOutlinedIcon fontSize="large" />
        </Badge>
      </Button>

      <div className={itemStyles.itemList}>
        {arr ? (
          arr.map((item) => (
            <Item
              key={item._id}
              name={item.name}
              pic={item.picUrl}
              price={item.price}
              id={item._id}
              type='furniture'
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {arr && (
        <button
          style={{ marginBottom: "30px", marginLeft: "700px" }}
          onClick={() => setSize(size + 1)}
        >
          Load More
        </button>
      )}
    </>
  );
}

Furniture.getInitialProps = async () => {
  const res = await fetch(
    `https://equipment-renting.herokuapp.com/furniture/0`
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};
