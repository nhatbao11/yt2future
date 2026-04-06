import os
from datetime import datetime, timedelta

import pandas as pd
from vnstock import Quote

# Chỉ lấy đúng 3 chỉ số theo yêu cầu dashboard
INDICES = [
    ("VNINDEX", "VCI"),
    ("VN30", "VCI"),
    ("VN30F1M", "VCI"),
]


def normalize_history(df: pd.DataFrame, symbol: str) -> pd.DataFrame:
    """Chuẩn hóa cột để import DB ổn định."""
    if df.empty:
        return df

    # Chuẩn hóa tên cột thời gian về "time"
    if "date" in df.columns and "time" not in df.columns:
        df = df.rename(columns={"date": "time"})

    df["symbol"] = symbol
    df["time"] = pd.to_datetime(df["time"]).dt.date
    df = df.sort_values("time")

    # Tự tính lại change/changePct/ref nếu source chưa có
    if "change" not in df.columns:
        df["change"] = df["close"].diff()
    if "changePct" not in df.columns:
        prev_close = df["close"].shift(1)
        df["changePct"] = ((df["close"] - prev_close) / prev_close) * 100
    if "ref" not in df.columns:
        df["ref"] = df["close"].shift(1)

    cols = ["time", "open", "high", "low", "close", "volume", "change", "changePct", "ref", "symbol"]
    available_cols = [c for c in cols if c in df.columns]
    return df[available_cols]


def main() -> None:
    years = int(os.getenv("YEARS", "5"))
    now = datetime.now()
    end_date = now.strftime("%Y-%m-%d")
    start_date = (now - timedelta(days=365 * years)).strftime("%Y-%m-%d")

    df_all = []
    for symbol, source in INDICES:
        print(f"Lấy dữ liệu {symbol} từ {start_date} đến {end_date} ...")
        quote = Quote(symbol=symbol, source=source)
        df = quote.history(start=start_date, end=end_date, interval="1D")
        df = normalize_history(df, symbol)
        if not df.empty:
            df_all.append(df)

    if not df_all:
        raise RuntimeError("Không lấy được dữ liệu cho bất kỳ chỉ số nào.")

    out_file = "market_index_3months.csv"
    all_rows = pd.concat(df_all).sort_values(["symbol", "time"])
    all_rows.to_csv(out_file, index=False)
    print(f"Done! Dữ liệu đã lưu vào {out_file} với {len(all_rows)} dòng.")


if __name__ == "__main__":
    main()