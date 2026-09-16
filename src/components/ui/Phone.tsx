import styles from "./Phone.module.css";

/**
 * iPhone 16 Pro Max frame drawn in CSS (titanium body, Dynamic Island, side
 * buttons). The screenshot fills the screen; screen ratio 1290×2796.
 */
export function Phone({ src, alt = "", className = "", loading = "lazy", priority = false }: { src: string; alt?: string; className?: string; loading?: "lazy" | "eager"; priority?: boolean }) {
  return (
    <div className={`${styles.phone} ${className}`}>
      <span className={`${styles.btn} ${styles.action}`} aria-hidden="true" />
      <span className={`${styles.btn} ${styles.volUp}`} aria-hidden="true" />
      <span className={`${styles.btn} ${styles.volDown}`} aria-hidden="true" />
      <span className={`${styles.btn} ${styles.power}`} aria-hidden="true" />
      <div className={styles.body}>
        <div className={styles.screen}>
          <img src={src} alt={alt} width={600} height={1300} loading={loading} fetchPriority={priority ? "high" : "auto"} decoding="async" />
          <span className={styles.island} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
