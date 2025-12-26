import React from 'react';
import Modal from '@material-ui/core/Modal';
import Checkbox from '@material-ui/core/Checkbox';
import clsx from 'clsx';

import { useForm } from 'react-hook-form';
import classes from '../styles/customForm/CustomForm.module.scss';
import useSwitch from '../../../hooks/useSwitch';
import {
  eyeIcon,
  eyeSlashIcon,
  formInfoIcon,
  modalCloseIcon,
} from '../../../assets/index';

export interface CheckboxOption {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onToggle: () => void;
}

export interface FormOption {
  id?: string;
  className?: string;
  label?: string;
  value?: string;
  type: string;
  name: string;
  onChange?: (e: any) => void;
  info?: { title: string; description: string | string[] };
  placeholder?: string;
  checkboxOptions?: CheckboxOption[];
  required?: boolean;
}

interface CustomFormProps {
  options: FormOption[];
  onSubmit?: (e: any) => void;
  labelStyle?: string;
}

interface LabelProps {
  text: string;
  info: { title: string; description: string | string[] } | undefined;
  required?: boolean;
  labelStyle?: string;
}

const FormLabel = (props: LabelProps) => {
  const isInfoModalOpen = useSwitch();

  return (
    <div className={classes.labelDiv}>
      <label className={props.labelStyle || classes.labelText}>
        {props.text}
        {props.required ? '*' : ''}
      </label>
      {props.info && (
        <>
          <img
            src={formInfoIcon}
            alt="Form Info Icon"
            className={classes.formInfoIcon}
            onClick={isInfoModalOpen.true}
          />
          <Modal
            open={isInfoModalOpen.value}
            onClose={isInfoModalOpen.false}
            className={classes.infoModal}
          >
            <div>
              <div className={classes.infoModalContent}>
                <h2>{props.info.title}</h2>
                <p>{props.info.description}</p>
              </div>
              <img
                src={modalCloseIcon}
                alt="Modal Close Icon"
                className={classes.modalCloseIcon}
                onClick={isInfoModalOpen.false}
              />
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

const PasswordInput = (props: any) => {
  console.log(props);

  const { register } = useForm();
  const passwordVisible = useSwitch();

  return (
    <div className={classes.passwordField}>
      <input
        id={props.id}
        className={clsx(props.className, classes.passwordInput)}
        type={passwordVisible.value ? 'text' : 'password'}
        {...register(props.name)}
        // value={props.value}
        // onChange={props.onChange}
      />
      <img
        onClick={passwordVisible.toggle}
        src={passwordVisible.value ? eyeSlashIcon : eyeIcon}
        alt="Toggle Password Visible"
      />
    </div>
  );
};

export default function CustomForm({ options, labelStyle }: CustomFormProps) {
  const { register } = useForm();
  // const [error, setError] = useState('');
  // const validate = (option: FormOption) => {
  // 	if ('Username' === option.label) {
  // 		return undefined;
  // 	}
  // }

  return (
    <>
      {options.map((option) => {
        let field: React.ReactElement | null = null;
        switch (option.type) {
          case 'checkboxGroup':
            field = (
              <div className={classes.checkboxGroup}>
                {option?.checkboxOptions?.map((checkbox) => (
                  <>
                    <Checkbox
                      style={{ color: 'white' }}
                      {...register(checkbox.name)}
                    />
                    <label className={classes.checkboxLabel}>
                      {checkbox.label}
                    </label>
                  </>
                ))}
              </div>
            );
            break;

          case 'textarea':
            field = (
              <textarea
                id={option.id}
                className={clsx(classes.textArea, option.className)}
                // value={option.value}
                {...register(option.name)}
              />
            );
            break;

          case 'password':
            field = <PasswordInput {...option} />;
            break;

          default:
            field = (
              <input
                id={option.id}
                className={clsx(classes.inputField, option.className)}
                type={option.type}
                // value={option.value}
                placeholder={option.placeholder}
                // required={option.required}
                {...register(option.name, { required: option.required })}
                // onBlur={validate(option)}
              />
            );
            break;
        }

        return (
          <div key={option.label} className={classes.fdcol}>
            {option.label && (
              <FormLabel
                labelStyle={labelStyle}
                text={option.label}
                info={option.info}
                required={option.required}
              />
            )}
            {field}
          </div>
        );
      })}
    </>
  );
}
