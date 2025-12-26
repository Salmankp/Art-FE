import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import CustomForm, { FormOption } from '../CustomForm/CustomForm';
import useInput from '../../../hooks/useInput';
import classes from '../styles/ForCreators/ForCreators.module.scss';
import useSwitch from '../../../hooks/useSwitch';

export default function RegistrationForm() {
  const firstName = useInput();
  const lastName = useInput();
  const email = useInput();
  const artistPersona = useInput();
  const artistBio = useInput();
  const website = useInput();
  const role = {
    agent: useSwitch(),
    artist: useSwitch(),
    estate: useSwitch(),
  };
  const social = {
    facebook: useInput(),
    instagram: useInput(),
    pinterest: useInput(),
    deviantArt: useInput(),
  };

  const options: FormOption[] = [
    {
      type: 'checkboxGroup',
      name: 'checkbox',
      label: 'Role',
      checkboxOptions: [
        {
          name: 'artist',
          label: 'Artist',
          value: 'artist',
          checked: role.artist.value,
          onToggle: role.artist.toggle,
        },
        {
          name: 'agent',
          label: 'Agent',
          value: 'agent',
          checked: role.agent.value,
          onToggle: role.artist.toggle,
        },
        {
          name: 'estate',
          label: 'Estate',
          value: 'estate',
          checked: role.estate.value,
          onToggle: role.artist.toggle,
        },
      ],
    },
    {
      type: 'text',
      name: 'firstname',
      label: 'First Name',
      value: firstName.value,
      onChange: firstName.set,
      required: true,
    },
    {
      type: 'text',
      name: 'lastname',
      label: 'Last Name',
      value: lastName.value,
      onChange: lastName.set,
      required: true,
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      value: email.value,
      onChange: email.set,
      required: true,
    },
    {
      type: 'text',
      name: 'artist-persona',
      label: 'Artist Persona (If Applicable)',
      value: artistPersona.value,
      onChange: artistPersona.set,
    },
    {
      type: 'textarea',
      name: 'artist-bio',
      label: 'Artist Bio',
      value: artistBio.value,
      onChange: artistBio.set,
    },
    {
      type: 'text',
      name: 'website',
      label: 'Website',
      value: website.value,
      onChange: website.set,
      required: true,
    },
  ];

  const onFormSubmit = async () => {};

  return (
    <div className={classes.form}>
      <h1 className={classes.header}>
        Register
        <span>your interest</span>
      </h1>
      <CustomForm labelStyle={classes.labelText} options={options} />
      <label className={classes.labelText}>Socials</label>
      <div className={classes.socialInputs}>
        <div className={classes.inputGroup}>
          <div className={classes.input}>
            <label className={classes.inputLabel}>Instagram</label>
            <input
              type="text"
              className={classes.inputField}
              value={social.instagram.value}
              onChange={social.instagram.set}
            />
          </div>
          <div className={classes.input}>
            <label className={classes.inputLabel}>Pinterest</label>
            <input
              type="text"
              className={classes.inputField}
              value={social.pinterest.value}
              onChange={social.pinterest.set}
            />
          </div>
        </div>
        <div className={classes.inputGroup}>
          <div className={classes.input}>
            <label className={classes.inputLabel}>Facebook</label>
            <input
              type="text"
              className={classes.inputField}
              value={social.facebook.value}
              onChange={social.facebook.set}
            />
          </div>
          <div className={classes.input}>
            <label className={classes.inputLabel}>DeviantArt</label>
            <input
              type="text"
              className={classes.inputField}
              value={social.deviantArt.value}
              onChange={social.deviantArt.set}
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: 30 }}>
        <div className={classes.checkboxDiv}>
          <Checkbox style={{ color: 'white' }} />
          <label className={classes.checkboxLabel}>
            I accept the
            <strong>Terms and Conditions</strong>
            and
            <strong>Privacy Policy</strong>
          </label>
        </div>
        <div className={classes.checkboxDiv}>
          <Checkbox style={{ color: 'white' }} />
          <label className={classes.checkboxLabel}>
            I don't want to recieve updates on new drops, artists or any
            marketing material from Artefy.
          </label>
        </div>
      </div>
      <button className={classes.submitButton} onClick={onFormSubmit}>
        Send
      </button>
      <p className={classes.requiredFields}>* Required Fields</p>
    </div>
  );
}
