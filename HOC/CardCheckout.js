import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const CardCheckout = ({ data }) => {
  let { handleFunction } = useContext(GlobalContext);
  let { formatRupiah } = handleFunction;

  return (
    <div className="w-full rounded-md p-5 shadow-md">
      <div className="flex">
        <p className="text-xs font-bold">{data.product.product_name}</p>
        <p className="text-xs">{data.quantity}</p>
      </div>
      <div>
        <p>Total : Rp{formatRupiah(data.unit_price)}</p>
      </div>
    </div>
  );
};

export default CardCheckout;
