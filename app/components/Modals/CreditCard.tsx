"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { FormEvent, useMemo, useState } from "react";

import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

type propsType = {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
};
export default function CreditCardModal(props: propsType) {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const [errors, setErros] = useState({
    number: false,
    expiry: false,
    cvc: false,
    name: false,
  });

  const handleInputChange = (evt: { target: { name: any; value: any } }) => {
    if (evt.target.name === "number" && evt.target.value.length > 16) return;

    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: { target: { name: any } }) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const validateExpiryDate = (value: string) => {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    return regex.test(value);
  };

  const isInvalid = useMemo(() => {
    if (state.expiry === "") return false;

    return validateExpiryDate(state.expiry) ? false : true;
  }, [state.expiry]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { number, expiry, cvc, name } = state;
    const errors = {
      number: false,
      expiry: false,
      cvc: false,
      name: false,
    };

    if (number.length !== 16) {
      errors.number = true;
    }

    if (!validateExpiryDate(expiry)) {
      errors.expiry = true;
    }

    if (cvc.length < 3 || cvc.length > 4) {
      errors.cvc = true;
    }

    if (name.length < 5) {
      errors.name = true;
    }

    setErros(errors);
  };

  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Payment</ModalHeader>
            <ModalBody>
              <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                // @ts-ignore
                focused={state.focus}
              />

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  required
                  label="Card Number"
                  max={9999999999999999}
                  maxLength={16}
                  type="number"
                  name="number"
                  placeholder="Card Number"
                  value={state.number}
                  onChange={handleInputChange}
                  // @ts-ignore
                  onFocus={handleInputFocus}
                />

                <Input
                  required
                  label="Card Holder"
                  type="text"
                  name="name"
                  placeholder="Card Holder"
                  value={state.name}
                  onChange={handleInputChange}
                  // @ts-ignore
                  onFocus={handleInputFocus}
                />

                <div className="flex gap-4">
                  <Input
                    required
                    label="Expiry Date"
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={state.expiry}
                    onChange={handleInputChange}
                    // @ts-ignore
                    onFocus={handleInputFocus}
                    isInvalid={isInvalid}
                    errorMessage={
                      isInvalid && "Invalid expiry date format (MM/YY)"
                    }
                  />

                  <Input
                    required
                    label="CVC"
                    type="number"
                    name="cvc"
                    minLength={3}
                    maxLength={4}
                    placeholder="CVC"
                    value={state.cvc}
                    onChange={handleInputChange}
                    // @ts-ignore
                    onFocus={handleInputFocus}
                  />
                </div>
              </form>
            </ModalBody>

            <ModalFooter>
              <Button color="danger" className="text-white" onClick={onClose}>
                Cancelar
              </Button>
              <Button color="success" className="text-white" type="submit">
                Aceptar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
