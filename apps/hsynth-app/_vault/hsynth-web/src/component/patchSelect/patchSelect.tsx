import './patchSelect.sass';

import { MIDIVal, MIDIValInput, MIDIValOutput } from '@midival/core';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React, { FC, MouseEvent, useEffect, useState } from 'react';

import { PATCH_SELECTION_HEADER } from '../../model/constant/appConstants';
import {
  DEFAULT_BANK_NAME,
  DEFAULT_PROGRAM_NAME,
  HSYNTH_MIDI_CC_BANK,
  HSYNTH_MIDI_DEVICE_NAME,
} from '../../model/constant/appConstants';
import BankSelect from '../bankSelect/bankSelect';
import BankData from './../../model/interface/bankData';
import PatchData from './../../model/interface/patchData';
import PatchHeader from './../patchHeader/patchHeader';

interface Props {
  banks: BankData[];
}

const PatchSelect: FC<{
  banks: BankData[];
}> = ({ banks }: Props) => {
  const [hsynthMidiOutput, setHsynthMidiOutput] = useState<MIDIValOutput>();
  const [hsynthMidiInput, setHsynthMidiInput] = useState<MIDIValInput>();
  const [programList, setProgramList] = useState<PatchData[]>();
  const [programIndex, setProgramIndex] = useState(0);
  const [bankIndex, setBankIndex] = useState(0);
  const [activeBankName, setActiveBankName] = useState('');

  let names = [];
  for (let bank of banks) {
    names.push(bank.title);
  }
  const [bankNames, setBankNames] = useState<string[]>(names);
  const [selectedBankName, setSelectedBankName] = useState<string>(DEFAULT_BANK_NAME);
  const [selectedProgramName, setSelectedProgramName] =
    useState<string>(DEFAULT_PROGRAM_NAME);

  useEffect(() => {
    getMidiInstrument();
  }, []);

  useEffect(() => {
    if (hsynthMidiOutput) {
      setProgramList(banks[bankIndex].programs);
      setProgram(hsynthMidiOutput, bankIndex, programIndex);
    }
  }, [hsynthMidiOutput]);

  useEffect(() => {
    if (hsynthMidiInput) {
      // todo: investigate why "onProgramChange" doesn't work
      hsynthMidiInput.onAllProgramChange(({ channel, program }) => {
        // console.log(`CHANNEL: ${channel} NOW Program ${program}`);
        setProgramIndex(program);

        updateHeader(
          banks[bankIndex].title,
          banks[bankIndex].programs[program - 1].title,
        );
      });
    }
  }, [hsynthMidiInput]);

  async function getMidiInstrument() {
    MIDIVal.connect().then((accessObject) => {
      for (let i = 0; i < accessObject.inputs.length; i++) {
        const name = accessObject.inputs[i].name;
        if (name === HSYNTH_MIDI_DEVICE_NAME) {
          setHsynthMidiOutput(new MIDIValOutput(accessObject.outputs[i]));
          setHsynthMidiInput(new MIDIValInput(accessObject.inputs[i]));
        }
      }
    });
  }

  const handleClick =
    (index: number) =>
    (e: MouseEvent<HTMLElement>): void => {
      e.preventDefault();

      if (hsynthMidiOutput) {
        setProgram(hsynthMidiOutput, bankIndex, index);
        setProgramIndex(index);
      }
    };

  const handleBankSelect = (index: number, fileIndex: number) => {
    if (hsynthMidiOutput) {
      console.log(
        'HANDLE BANK SELECT index: ' +
          index +
          ' fileIndex: ' +
          fileIndex +
          ' pIndex: ' +
          programIndex,
      );

      setProgramList(banks[fileIndex].programs);
      setBankIndex(index);
      setProgram(hsynthMidiOutput, index, programIndex);
    }
  };

  function setProgram(output: MIDIValOutput, bankIndex: number, programIndex: number) {
    output.sendControlChange(HSYNTH_MIDI_CC_BANK, bankIndex);
    output.sendProgramChange(programIndex);

    updateHeader(banks[bankIndex].title, banks[bankIndex].programs[programIndex].title);
  }

  function updateHeader(bankName: string, programName: string) {
    setSelectedBankName(bankName);
    setSelectedProgramName(programName);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '10px',
      }}
    >
      <Container
        component="main"
        sx={{ mt: 8, mb: 2, marginTop: '10px' }}
        maxWidth="lg"
        className="containerBg rcorners"
      >
        <PatchHeader bankName={selectedBankName} programName={selectedProgramName} />
        <BankSelect bankNames={bankNames} selectHandler={handleBankSelect} />
        <Grid container rowSpacing={0.5} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
          {programList?.map((program, index) => (
            <Grid item xs={3} key={index} className="grid">
              <Button
                variant="contained"
                key={index}
                onClick={handleClick(index)}
                sx={{
                  backgroundColor: index === programIndex ? 'green' : 'black',
                  color: index === programIndex ? 'white' : 'gray',
                }}
              >
                {program.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PatchSelect;
