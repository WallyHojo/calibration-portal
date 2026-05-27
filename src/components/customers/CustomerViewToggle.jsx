import { ViewToggle } from "../ui/primitives";

export default function CustomerViewToggle({ view, onChange }) {
  return <ViewToggle view={view} onChange={onChange} />;
}