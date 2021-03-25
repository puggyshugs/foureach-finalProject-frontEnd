import Input from '../Input/Input.css';
import { Button } from "@chakra-ui/react";
import { ChatIcon } from '@chakra-ui/icons';


 

function Input() {


  
  return (
    <div className="Input">
      <input type="text" ></input>
      <Button leftIcon={<ChatIcon />} colorScheme= "purple" variant="solid">Send Message</Button>
    </div>
  );
}

export default Input;
