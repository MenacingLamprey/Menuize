export const clearFields = (booleanSetters : React.Dispatch<React.SetStateAction<boolean>>[], fieldSetters : React.Dispatch<React.SetStateAction<string>>[]) => {
  //set each adding boolean to false
  //is this better than just directly setting them false? probably not really
  booleanSetters.forEach(addingSetter => addingSetter(false));
  //set all input fields to false
  fieldSetters.forEach(inputSetter => inputSetter(""))
}