import { TextField, InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import InputSize from "../InputSize";

export default function Address(props) {
  const prefecture = ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
"茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
"新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県",
"静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県",
"奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県",
"徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県",
"熊本県","大分県","宮崎県","鹿児島県","沖縄県"];
  return (
    <>
      <div>
        <InputSize />
        <TextField type="text" size="small" label={"PostNumber"} id={"PostNumber"} name="post" onBlur={ props.handleNumberError} onChange={props.handleChange} />
        {props.inputError.post &&
          props.inputError.post.map((item) => {
            const random = Math.random();
            return(
            <p key={random} style={{ color: "red", marginTop: '5px', marginBottom: 0, fontSize: '13px' }}>
              {item}
            </p>
            )
          })
        }
      </div>
      <div style={{marginTop: '8px'}}>
        <FormControl style={{width: '60%'}}>
        <InputLabel id="Prefecture">Prefecture</InputLabel>
        <Select labelId="prefecture" id="Prefecture" label="prefecture" onFocus={props.getAddress} name="prefecture" value={props.fetchData.prefecture} onChange={props.handleChange}>
          <MenuItem value="選択してください">選択してください</MenuItem>
          {prefecture.map((item) => {
            let random = Math.random();
            return (
              <MenuItem key={random} value={item}>{item}</MenuItem>
            );
          })}
          </Select>
        </FormControl>
      </div>
      <div>
        <InputSize />
        <TextField type="text" size="small" label={"Address"} id={"Address"} name="address" value={props.fetchData.address} onBlur={props.handleError} onChange={props.handleChange} />
        {props.inputError.address && <p style={{ color: "red", marginTop: '5px', marginBottom: 0, fontSize: '13px' }}>{props.inputError.address}</p>}
      </div>
    </>
  );
}