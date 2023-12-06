import styled from 'styled-components';
import { COLORS } from './lib/colors';
import { useState } from 'react';

import arrowImage from './assets/images/icon-arrow.svg';
import calculateAge, { Age } from './lib/calculator';
import { dayIsValid, monthIsValid, yearIsValid } from './lib/validators';

type AgeFormInput = {
  day: string;
  month: string;
  year: string;
};

const AGE_FORM_INIT: AgeFormInput = {
  day: '',
  month: '',
  year: '',
};

export default function App() {
  const [ageFormInput, setAgeFormInput] = useState<AgeFormInput>(AGE_FORM_INIT);
  const [calculatedAge, setCalculatedAge] = useState<Age | null>(null);
  const [isInvalid, setIsInvalid] = useState<
    Record<keyof Age, boolean | string>
  >({
    days: false,
    months: false,
    years: false,
  });

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!ageFormInput.day || !ageFormInput.month || !ageFormInput.year) {
      dateValidation();
      monthValidation();
      yearValidation();
    } else if (
      yearIsValid(+ageFormInput.year) &&
      monthIsValid(+ageFormInput.month) &&
      dayIsValid(+ageFormInput.day, +ageFormInput.month)
    ) {
      setCalculatedAge(
        calculateAge(+ageFormInput.day, +ageFormInput.month, +ageFormInput.year)
      );
      setIsInvalid({
        days: false,
        months: false,
        years: false,
      });
    } else {
      console.log('hello');
    }
  }

  function dateValidation() {
    if (
      !dayIsValid(
        +ageFormInput.day,
        +ageFormInput.month || new Date().getMonth() + 1
      )
    ) {
      setIsInvalid((prev) => ({
        ...prev,
        days:
          ageFormInput.day === ''
            ? 'This field is required'
            : 'Must be a valid date',
      }));
    } else {
      setIsInvalid((prev) => ({ ...prev, days: false }));
    }
  }

  function monthValidation(): void {
    if (!monthIsValid(+ageFormInput.month)) {
      setIsInvalid((prev) => ({
        ...prev,
        months:
          ageFormInput.month === ''
            ? 'This field is required'
            : 'Must be a valid month',
      }));
    } else {
      setIsInvalid((prev) => ({ ...prev, months: false }));
      dateValidation();
    }
  }

  function yearValidation(): void {
    if (!yearIsValid(+ageFormInput.year)) {
      setIsInvalid((prev) => ({
        ...prev,
        years:
          ageFormInput.year === ''
            ? 'This field is required'
            : +ageFormInput.year > new Date().getFullYear()
              ? 'Must be in the past'
              : 'Must be a valid year',
      }));
    } else {
      setIsInvalid((prev) => ({ ...prev, years: false }));
    }
  }

  return (
    <Wrapper>
      <section>
        <FormWrapper onSubmit={submitForm} id='age-calculator-form'>
          <InputContainer>
            <InputLabel htmlFor='day-input' $invalid={isInvalid.days !== false}>
              DAY
            </InputLabel>
            <Input
              placeholder='DD'
              type='text'
              name='day-input'
              id='day-input'
              value={ageFormInput.day}
              $invalid={isInvalid.days !== false}
              onBlur={dateValidation}
              onChange={(e) =>
                setAgeFormInput((prev) => ({ ...prev, day: e.target.value }))
              }
            />
            {isInvalid.days && (
              <ValidationMessage>{isInvalid.days}</ValidationMessage>
            )}
          </InputContainer>
          <InputContainer>
            <InputLabel
              htmlFor='month-input'
              $invalid={isInvalid.months !== false}
            >
              MONTH
            </InputLabel>
            <Input
              placeholder='MM'
              type='text'
              name='month-input'
              id='month-input'
              value={
                ageFormInput.month !== ''
                  ? ('00' + ageFormInput.month).slice(-2)
                  : ageFormInput.month
              }
              $invalid={isInvalid.months !== false}
              onBlur={monthValidation}
              onChange={(e) =>
                setAgeFormInput((prev) => ({ ...prev, month: e.target.value }))
              }
            />
            {isInvalid.months && (
              <ValidationMessage>{isInvalid.months}</ValidationMessage>
            )}
          </InputContainer>
          <InputContainer>
            <InputLabel
              htmlFor='year-input'
              $invalid={isInvalid.years !== false}
            >
              YEAR
            </InputLabel>
            <Input
              placeholder='YYYY'
              type='text'
              name='year-input'
              id='year-input'
              value={ageFormInput.year}
              $invalid={isInvalid.years !== false}
              onBlur={yearValidation}
              onChange={(e) =>
                setAgeFormInput((prev) => ({ ...prev, year: e.target.value }))
              }
            />
            {isInvalid.years && (
              <ValidationMessage>{isInvalid.years}</ValidationMessage>
            )}
          </InputContainer>
        </FormWrapper>
      </section>

      <MiddleSection>
        <SubmitButton
          type='submit'
          title='Calculate age'
          form='age-calculator-form'
        >
          <img src={arrowImage} />
        </SubmitButton>
        {/* divider */}
      </MiddleSection>
      <BottomSection>
        <p>
          <Number>{calculatedAge?.years ?? '--'}</Number> years
        </p>
        <p>
          <Number>{calculatedAge?.months ?? '--'}</Number> months
        </p>
        <p>
          <Number>{calculatedAge?.days ?? '--'}</Number> days
        </p>
      </BottomSection>
    </Wrapper>
  );
}

const BREAKPOINT = '900px';

const Wrapper = styled.main`
  background-color: hsl(${COLORS.white});
  padding: 52px 24px;
  border-radius: 24px;
  border-end-end-radius: 88px;
  width: 343px;
  max-width: 95vw;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 64px;

  @media screen and (min-width: ${BREAKPOINT}) {
    width: 840px;
    max-width: 840px;
    border-end-end-radius: 180px;
    padding: 56px;
    gap: 48px;
  }
`;

const FormWrapper = styled.form`
  display: flex;
  gap: 16px;

  @media screen and (min-width: ${BREAKPOINT}) {
    gap: 32px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const InputLabel = styled.label<{ $invalid: boolean }>`
  --color: ${({ $invalid }) =>
    $invalid ? `hsl(${COLORS['light-red']})` : `hsl(${COLORS['smokey-grey']})`};
  font-size: 0.8rem;
  letter-spacing: ${1 / 8}rem;
  line-height: 1;
  text-transform: uppercase;
  /* color: hsl(${COLORS['smokey-grey']}); */
  color: var(--color);
  font-weight: 700;

  @media screen and (min-width: ${BREAKPOINT}) {
    font-size: 0.9rem;
    letter-spacing: ${1 / 5}rem;
    line-height: 1.4;
  }
`;

const Input = styled.input<{ $invalid: boolean }>`
  --border-color: ${({ $invalid }) =>
    $invalid ? `hsl(${COLORS['light-red']})` : `hsl(${COLORS['light-grey']})`};
  border: 1px solid var(--border-color);
  border-radius: 8px;

  width: 100%;
  font-size: 1.25rem;
  line-height: 1;
  padding: 8px 16px;

  &:focus {
    border: 1px solid hsl(${COLORS.purple});
  }

  &:focus-visible {
    outline-offset: 2px;
    outline: none;
  }

  @media screen and (min-width: ${BREAKPOINT}) {
    max-width: 158px;
    font-size: 2rem;
    padding: 18px;
  }
`;

const ValidationMessage = styled.p`
  color: hsl(${COLORS['light-red']});
  font-style: italic;
  font-weight: 400;
  font-size: ${10 / 16}rem;

  @media screen and (min-width: ${BREAKPOINT}) {
    font-size: 0.9rem;
  }
`;

const MiddleSection = styled.section`
  width: 100%;
  position: relative;
  border-bottom: 2px solid hsl(${COLORS['light-grey']} / 0.5);
`;

const SubmitButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(50%);

  width: 66px;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px;
  border-radius: 9999px;
  border: none;
  background-color: hsl(${COLORS.purple});
  cursor: pointer;

  transition: background-color 150ms;

  &:hover {
    background-color: hsl(0deg 0% 0%);
  }

  @media screen and (min-width: ${BREAKPOINT}) {
    right: 0;
    left: unset;
    transform: translateY(50%);
    width: 100px;
  }
`;

const BottomSection = styled.section`
  font-size: 3.4rem;
  font-weight: 800;
  font-style: italic;
  line-height: 1.1;

  @media screen and (min-width: ${BREAKPOINT}) {
    font-size: 6.5rem;
  }
`;

const Number = styled.span`
  color: hsl(${COLORS.purple});
`;
