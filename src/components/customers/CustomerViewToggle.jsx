import { ViewToggle } from "../ui/Primitives";

export default function CustomerViewToggle({ view, onChange }) {
  return <ViewToggle view={view} onChange={onChange} />;
}