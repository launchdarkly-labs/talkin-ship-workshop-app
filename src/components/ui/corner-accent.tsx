import styles from "@/styles/Home.module.css";

export default function CornerAccent({
  label,
}: {
  label: string;
}) {
  const style = {
    left: -25,
    top: 30,
    transform: "rotate(45deg)",
  };

  return label ? (
    <div className={[styles.ribbon, styles["ribbon-top-right"]].join(" ")}>
      <span style={style}>{label}</span>
    </div>
  ) : null;
}
