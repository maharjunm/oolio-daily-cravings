import { SmallText } from "../typography";
import { StyledButton } from "./styles";

export const Button = ({ name, isPrimary }: { name: string; isPrimary?: boolean }) => {
    return (
        <StyledButton isPrimary={isPrimary}>
            <SmallText color={isPrimary ? '#E7AB91' : '#7E7775'} fontWeight={600}>
            {name}
            </SmallText>
        </StyledButton>
    )
};