const genderRadioOptions = [
  { value: "M", label: "Male", name: "male" },
  { value: "F", label: "Female", name: "female" },
  { value: "NS", label: "Not To Say", name: "ns" },
  { value: "O", label: "Other", name: "other" },
];

const genderMap = {
  M: "Male",
  F: "Female",
  O: "Other",
  NS: "Not to Say",
};
export { genderMap };
export default genderRadioOptions;
