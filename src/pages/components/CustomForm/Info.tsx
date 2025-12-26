import React from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';

import useSwitch from '../../../hooks/useSwitch';
import formInfoIcon from '../../../assets/images/formInfo.svg';
import modalCloseIcon from '../../../assets/images/modalClose.svg';
import classes from '../styles/customForm/CustomForm.module.scss';

export interface InfoProps {
  title: string;
  description: string | string[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

const Info = ({ title, description }: InfoProps) => {
  const modalClasses = useStyles();
  const isModalOpen = useSwitch();

  return (
    <>
      <img
        src={formInfoIcon}
        alt="Form Info Icon"
        className={classes.formInfoIcon}
        onClick={isModalOpen.true}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={modalClasses.modal}
        open={isModalOpen.value}
        onClose={isModalOpen.false}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen.value} timeout={100}>
          <div className={classes.infoModalContent}>
            <h2 style={{ marginBottom: 10 }}>
              <img
                src={formInfoIcon}
                alt="Form Info Icon"
                className={classes.formInfoIcon}
                onClick={isModalOpen.true}
              />
              {title}
            </h2>
            {Array.isArray(description) ? (
              <ul>
                {description.map((desc, id) => {
                  return <li key={id.toString()}>{desc}</li>;
                })}
              </ul>
            ) : (
              <p className={classes.description}>{description}</p>
            )}
            <img
              src={modalCloseIcon}
              alt="Modal Close Icon"
              className={classes.modalCloseIcon}
              onClick={isModalOpen.false}
            />
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default Info;
