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
          <p>{title}</p>
          <h1>{amount}</h1>
        </div>
        <p>
          <Icon />
        </p>
      </div>
      <div>{percentageGrowth}</div>
    </div>
  );
};

export default AdminInfoBox;
