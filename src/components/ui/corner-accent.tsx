import styles from "@/styles/Home.module.css";

export default function CornerAccent({
  label,
}: {
  label: string;
}) {

  return label ? (
    <div className={styles.ribbon}>
      <span>{label}</span>
    </div>
  ) : null;
}
