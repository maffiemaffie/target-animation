class Wrapper {
    departureTime;
    arrivalTime;

    EASING;
    MAX_SPEED;

    target;

    physicsGuys = {
        'position': {'x': 0, 'y': 0},
        'velocity': {'x': 0, 'y': 0},
        'acceleration': {'x': 0, 'y': 0}
    }

    updateValues(position, velocity, deltaTime) {

    }
    
    #updateValuesEaseIn(position, velocity, deltaTime) {
        const calculateAcceleration = (origin, target, initialVelocity, maxSpeed, duration) => {
            const [xbx, xby, xax, xay, vx, vy, s, t] = [target.x, target.y, origin.x, origin.y, initialVelocity.x, initialVelocity.y, maxSpeed, duration];
            const a1x = -vx / t;
            const a1y = -vy / t;

            const scale = t * Math.sqrt(
                (xbx - (0.5 * a1x * t - vx) * t - xax)**2 + 
                (xby - (0.5 * a1y * t - vy) * t - xay)**2);

            const a2x = s * (xbx - (0.5 * a1x * t - vx) * t - xax) * scale;
            const a2y = s * (xby - (0.5 * a1y * t - vy) * t - xay) * scale;

            return {
                'x': a1x + a2x,
                'y': a1y + a2y
            };
        }

        const calculateVelocityComponent = (initialVelocity, acceleration, time) => {
            const [a, t, v] = [acceleration, time, initialVelocity];
            return a * t + v;
        }
    
        const newPosition = {};
        const newVelocity = {};
        const newAcceleration = {};
    
        newAcceleration = calculateAcceleration(position, this.target, velocity, this.MAX_SPEED, this.arrive - this.now);

        newVelocity.x = calculateVelocityComponent(velocity.x, newAcceleration.x, deltaTime);
        newVelocity.y = calculateVelocityComponent(velocity.y, newAcceleration.y, deltaTime);

        newPosition.x = this.#calculatePositionComponent(position.x, velocity.x, newAcceleration.x, deltaTime);
        newPosition.y = this.#calculatePositionComponent(position.y, velocity.y, newAcceleration.y, deltaTime);

        return {
            'position': newPosition,
            'velocity': newVelocity,
        };
    }

    #updateValuesLinear(position, velocity, deltaTime) {
        const newPosition = {};
        const newVelocity = {};

        newPosition.x = calculatePositionComponent(position.x, velocity.x, 0, deltaTime);
        newPosition.y = calculatePositionComponent(position.y, velocity.y, 0, deltaTime);

        return {
            'position': newPosition,
            'velocity': newVelocity,
        };
    }

    #updateValuesEaseOut(position, velocity, deltaTime) {

    }

    #calculatePositionComponent(position, initialVelocity, acceleration, time) {
        const [x, v, a, t] = [position, initialVelocity, acceleration, time];
        return x + t * (v + 0.5 * a * t);
    }
}

/*
 * Yo a (computationally) faster way to do this would probably be to save the acceleration and then calculate just the position each time btw lol 
 */

class AnimationPath {
    departureTime;
    arrivalTime;

    EASING;
    MAX_SPEED;

    target;

    // FunctionPaths
    position;
    velocity;
    acceleration;

    set position(value) { throw 'position is readonly' };
    set velocity(value) { throw 'velocity is readonly' };
    set acceleration(value) { throw 'acceleration is readonly' };

    constructor(origin, target, initialVelocity, maxSpeed, easing) {
        // calculate accelerations
        const calculateAcceleration = (origin, target, initialVelocity, maxSpeed, easing) => {
            const [xbx, xby, xax, xay, vx, vy, s, t] = [target.x, target.y, origin.x, origin.y, initialVelocity.x, initialVelocity.y, maxSpeed, easing];
            const a1x = -vx / t;
            const a1y = -vy / t;

            const scale = t * Math.sqrt(
                (xbx - (0.5 * a1x * t - vx) * t - xax)**2 + 
                (xby - (0.5 * a1y * t - vy) * t - xay)**2);

            const a2x = s * (xbx - (0.5 * a1x * t - vx) * t - xax) * scale;
            const a2y = s * (xby - (0.5 * a1y * t - vy) * t - xay) * scale;

            return {
                'x': a1x + a2x,
                'y': a1y + a2y
            };
        }
        const accelerationEaseIn = calculateAcceleration(origin, target, initialVelocity, maxSpeed, easing);
        const accelerationLinear = 0;

        // calculate velocity functions

        // calculate position functions
    }
}

class FunctionPath {
    pathFunction;
    constructor(pathFunction) {
        this.pathFunction = pathFunction;
    }

    at(timeSeconds) {
        return this.pathFunction(timeSeconds);
    }
}
