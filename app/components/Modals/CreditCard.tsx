"use client";
import { selectCreditCard } from "@/lib/redux/slices/creditCardSlice/selector";
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
import { useSelector } from "react-redux";

type CreditCardState = {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus: string;
};

type propsType = {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  creditCard: CreditCardState;
  setCreditCard: (creditCard: CreditCardState) => void;
};
export default function CreditCardModal(props: propsType) {
    const creditCard = useSelector(selectCreditCard);

  const handleInputChange = (evt: { target: { name: any; value: any } }) => {
    if (evt.target.name === "number" && evt.target.value.length > 16) return;
    if (evt.target.name === "cvc" && evt.target.value.length > 4) return;

    const { name, value } = evt.target;

    props.setCreditCard({ ...props.creditCard, [name]: value });
  };

  const handleInputFocus = (evt: { target: { name: any } }) => {
    props.setCreditCard({ ...props.creditCard, focus: evt.target.name });
  };

  const validateExpiryDate = (value: string) => {
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    return regex.test(value);
  };

  const isInvalid = useMemo(() => {
    if (props.creditCard.expiry === "") return false;

    return validateExpiryDate(props.creditCard.expiry) ? false : true;
  }, [props.creditCard.expiry]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { number, expiry, cvc, name } = props.creditCard;
  };

  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Payment</ModalHeader>
            <ModalBody>
              <Cards
                number={creditCard.number}
                expiry={props.creditCard.expiry}
                cvc={props.creditCard.cvc}
                name={props.creditCard.name}
                // @ts-ignore
                focused={props.creditCard.focus}
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
                  value={props.creditCard.number}
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
                  value={props.creditCard.name}
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
                    value={props.creditCard.expiry}
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
                    value={props.creditCard.cvc}
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
