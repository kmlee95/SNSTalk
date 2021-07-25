import React, { useState, useCallback, useMemo, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, message } from 'antd';

import { Form, DoubleWrapper, DateWrapper, InputWrapper, GenderWrapper, TermWrapper, SubmitWrapper } from './styled';
import Input from '@components/Input';
import WarningMessage from './WarningMessage';
import Select from '@components/Select';
import Terms from './Terms';
import {
  getIdWarningMsg,
  getPwWarningMsg,
  getPwReWarningMsg,
  getPhoneWarningMsg,
  getMailWarningMsg,
} from './getMessage';
import { getIdWarningLevel, getPwWarningLevel, getPhoneWarningLevel, getMailWarningLevel } from './getLevel';
import { RootState } from '../../reducers';
import { LOADING_SIGNUP_SUBMIT } from '../../reducers/user/values';
import { signUpRequest } from '../../reducers/user/signup';

const SignUpForm = memo(() => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state: RootState) => state.user);

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRe, setPasswordRe] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [mail, setMail] = useState('');
  const [termsCheck, setTermsCheck] = useState(false);
  const [idWarnLevel, setIdWarnLevel] = useState(0);
  const [pwWarnLevel, setPwWarnLevel] = useState(0);
  const [pwReWarnLevel, setPwReWarnLevel] = useState(0);
  const [phoneLevel, setPhoneLevel] = useState(0);
  const [mailLevel, setMailLevel] = useState(0);

  const idWarnMessage = useMemo(() => getIdWarningMsg(idWarnLevel), [idWarnLevel]);
  const passwordWarnMessage = useMemo(() => getPwWarningMsg(pwWarnLevel), [pwWarnLevel]);
  const passwordReWarnMessage = useMemo(() => getPwReWarningMsg(pwReWarnLevel), [pwReWarnLevel]);
  const phoneWarnMessage = useMemo(() => getPhoneWarningMsg(phoneLevel), [phoneLevel]);
  const mailWarnMessage = useMemo(() => getMailWarningMsg(mailLevel), [mailLevel]);

  const onSubmitForm = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (idWarnLevel !== 3) {
        message.info('아이디를 확인해 주세요.');
      } else if (pwWarnLevel !== 3) {
        message.info('비밀번호를 확인해 주세요.');
      } else if (pwReWarnLevel !== 3) {
        message.info('비밀번호 재확인을 확인해 주세요.');
      } else if (familyName === '' || firstName === '') {
        message.info('이름을 확인해 주세요.');
      } else if (birth === '') {
        message.info('생년월일을 확인해 주세요.');
      } else if (gender === '') {
        message.info('성별을 확인해 주세요.');
      } else if (phoneLevel !== 3) {
        message.info('전화번호를 확인해 주세요.');
      } else if (mailLevel !== 3) {
        message.info('이메일을 확인해 주세요.');
      } else if (!termsCheck) {
        message.info('약관에 동의해주세요.');
      } else {
        dispatch(
          signUpRequest({
            userId,
            password,
            familyName,
            firstName,
            birth,
            gender,
            phone,
            mail,
          }),
        );
      }
    },
    [idWarnLevel, pwWarnLevel, pwReWarnLevel, familyName, firstName, birth, gender, phoneLevel, mailLevel, termsCheck],
  );

  const onReset = useCallback(() => {
    setUserId('');
    setPassword('');
    setPasswordRe('');
    setFamilyName('');
    setFirstName('');
    setBirth('');
    setGender('');
    setPhone('');
    setMail('');
    setTermsCheck(false);
    setIdWarnLevel(0);
    setPwWarnLevel(0);
    setPwReWarnLevel(0);
    setPhoneLevel(0);
    setMailLevel(0);
  }, []);

  const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const level = getIdWarningLevel(value);
    setUserId(value);
    setIdWarnLevel(level);
  }, []);

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const level = getPwWarningLevel(value);
    setPassword(value);
    setPwWarnLevel(level);
  }, []);

  const onChangePasswordRe = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const level = (() => {
        if (value.length === 0) {
          return 0;
        }
        if (value === password) {
          return 3;
        }
        return 1;
      })();
      setPasswordRe(value);
      setPwReWarnLevel(level);
    },
    [password],
  );

  const onChangeFamilyName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyName(e.target.value);
  }, []);

  const onChangeFirstName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  }, []);

  const onChangeBirth = useCallback((date, dateString) => {
    setBirth(dateString);
  }, []);

  const onChangeGender = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  }, []);

  const onChnagePhone = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const level = getPhoneWarningLevel(value);
    setPhone(value);
    setPhoneLevel(level);
  }, []);

  const onChnageMail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const level = getMailWarningLevel(value);
    setMail(value);
    setMailLevel(level);
  }, []);

  const onTermsCheck = useCallback(() => {
    setTermsCheck(true);
  }, []);

  return (
    <Form onSubmit={onSubmitForm}>
      <InputWrapper>
        <div>ID</div>
        <Input value={userId} onChange={onChangeId} type="text" />
        <WarningMessage level={idWarnLevel} message={idWarnMessage} />
      </InputWrapper>
      <InputWrapper>
        <div>Password</div>
        <Input value={password} onChange={onChangePassword} type="password" />
        <WarningMessage level={pwWarnLevel} message={passwordWarnMessage} />
      </InputWrapper>
      <InputWrapper>
        <div>Password Confirm</div>
        <Input value={passwordRe} onChange={onChangePasswordRe} type="password" />
        <WarningMessage level={pwReWarnLevel} message={passwordReWarnMessage} />
      </InputWrapper>
      <div>
        <div>Name</div>
        <DoubleWrapper>
          <Input value={familyName} onChange={onChangeFamilyName} type="text" placeholder="성" />
          <Input value={firstName} onChange={onChangeFirstName} type="text" placeholder="이름" />
        </DoubleWrapper>
      </div>
      <InputWrapper>
        <div>Birth</div>
        <DateWrapper placeholder="날짜 선택" onChange={onChangeBirth} />
      </InputWrapper>
      <GenderWrapper>
        <div>Gender</div>
        <Select value={gender} onChange={onChangeGender} option={['남성', '여성']} />
      </GenderWrapper>
      <InputWrapper>
        <div>Email</div>
        <Input value={phone} onChange={onChnagePhone} type="text" />
        <WarningMessage level={phoneLevel} message={phoneWarnMessage} />
      </InputWrapper>
      <InputWrapper>
        <div>Phone Number</div>
        <Input value={mail} onChange={onChnageMail} type="text" />
        <WarningMessage level={mailLevel} message={mailWarnMessage} />
      </InputWrapper>
      <TermWrapper>
        <Terms termsCheck={termsCheck} onTermsCheck={onTermsCheck} />
      </TermWrapper>
      <SubmitWrapper>
        <Button type="primary" onClick={onReset}>
          Reset
        </Button>
        <Button type="primary" htmlType="submit" loading={isLoading.name === LOADING_SIGNUP_SUBMIT}>
          SignUp
        </Button>
      </SubmitWrapper>
    </Form>
  );
});

export default SignUpForm;
