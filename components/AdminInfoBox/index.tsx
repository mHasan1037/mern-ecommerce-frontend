import React from "react";
import styles from "./adminInfoBox.module.css";
import { IconType } from "react-icons";

type Props = {
  title: string;
  amount: number | undefined;
  Icon: IconType;
  percentageGrowth: string;
};

const AdminInfoBox: React.FC<Props> = ({
  title,
  amount,
  Icon,
  percentageGrowth,
}) => {
  return (
    <div className={styles.dashBoardBox}>
      <div className={styles.totalCountFlex}>
        <div>
          <p className="text-xl text-gray-800 font-medium">{title}</p>
          <h1 className="text-3xl font-semibold">{amount}</h1>
        </div>
        <Icon className="text-green-500 text-5xl"/>
      </div>
      <div>{percentageGrowth}</div>
    </div>
  );
};

export default AdminInfoBox;
