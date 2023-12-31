import React, { FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SendResetEmail } from "../firebase";

var emailErrorMessages: { [key: string]: string } = {
    "auth/missing-email": "メールアドレスの形式が間違っています。",
    "auth/invalid-email": "メールアドレスの形式が間違っています。",
    "auth/user-disabled": "ユーザーは無効になっています。",
    "auth/user-not-found": "ユーザーが存在しません。",
    "auth/invalid-login-credentials": "メールアドレスまたはパスワードが間違っています。",
    "auth/email-already-in-use": "このメールアドレスは既に使用されています。"
}

const ResetPassword: React.FC = () => {

    const [email, setEmail] = useState<string>("");
    const [isError, setIsError] = useState<string | undefined>(undefined);
    const [isPressed, setIsPressed] = useState<boolean>(false);
    const navigate = useNavigate();

    const sendEmail = async (event: FormEvent) => {
        event.preventDefault();
        setIsError(await SendResetEmail(email));

        // メールの形式が正しくない場合は処理を抜ける
        if (isError || !email) return;

        setIsPressed(true);
        window.setTimeout(function () {
            navigate("/signin");
        }, 5000);
    };

    return (
        <div className="block">
            <h1 className="headline">パスワードを再設定</h1>
            <p className="description">パスワード再設定用のメールを送信します。登録時のメールアドレスを入力してください。</p>
            <form className="block-content" onSubmit={sendEmail}>
                <input
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="メールアドレス"
                />
                {isError && isError in emailErrorMessages && <p className="separate error">{emailErrorMessages[isError]}</p>}
                <button type="submit">送信</button>
                {isPressed ? <p className="separate">再設定用のメールの送信が完了しました。5秒後に自動的にリダイレクトします。</p> : null}
            </form>
            <Link className="separate" to="/signin">戻る</Link>
        </div>
    );
}

export default ResetPassword;